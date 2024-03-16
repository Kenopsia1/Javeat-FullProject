import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { loggedUser } from '../App';
import { useNavigate } from 'react-router-dom';
import baldurs_map from "../background/baldurs_map.png"

export default function MapPage() {
    const [user, setUser] = useAtom(loggedUser);
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/restaurants');
                setRestaurants(response.data);
            } catch (error) {
                console.error("Errore nel recupero dei ristoranti:", error);
            }
        };

        fetchRestaurants();
    }, []);

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;

            function drawAxes() {
                ctx.beginPath();
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.strokeStyle = "rgba(0, 0, 0, 0)";
                ctx.stroke();
            }

            function drawGrid(gridSize = 20) {
                ctx.strokeStyle = "#ccc";
                for (let x = -width / 2; x <= width / 2; x += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x + width / 2, 0);
                    ctx.lineTo(x + width / 2, height);
                    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
                    ctx.stroke();
                }
                for (let y = -height / 2; y <= height / 2; y += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(0, y + height / 2);
                    ctx.lineTo(width, y + height / 2);
                    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
                    ctx.stroke();
                }
            }

            function drawPoint(x, y, color, name = '', isUser = false) {
                const transformedX = (x * width) / 100;
                const transformedY = height - (y * height) / 100;
                ctx.beginPath();
                ctx.arc(transformedX, transformedY, 5, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.fill();

                ctx.font = 'bold 12px Arial';
                ctx.fillStyle = color;
                if (name) {
                    ctx.fillText(name, transformedX + 10, transformedY + (isUser ? -10 : 5));
                }
            }

            canvas.addEventListener('click', (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = (event.clientX - rect.left) / (rect.right - rect.left) * width;
                const y = (event.clientY - rect.top) / (rect.bottom - rect.top) * height;

                restaurants.forEach(restaurant => {
                    const restaurantX = (restaurant.positionX * width) / 100;
                    const restaurantY = height - (restaurant.positionY * height) / 100;
                    const distance = Math.sqrt(Math.pow(x - restaurantX, 2) + Math.pow(y - restaurantY, 2));
                    if (distance < 10) { // Considera un raggio di 10 per il click
                        navigate(`/restaurants/${restaurant.id}`);
                    }
                });
            });

            function drawAll() {
                ctx.clearRect(0, 0, width, height);
                drawAxes();
                drawGrid();

                if (user && user.positionX !== undefined && user.positionY !== undefined) {
                    drawPoint(user.positionX, user.positionY, 'yellow', 'TU SEI QUI', true);
                }

                restaurants.forEach(restaurant => {
                    const distance = Math.sqrt(Math.pow(restaurant.positionX - user.positionX, 2) + Math.pow(restaurant.positionY - user.positionY, 2));
                    const restaurantColor = distance <= 20 ? 'green' : 'white'; // Verde se entro 20 unità, altrimenti rosso
                    ctx.font = '16px Post Antiqua';
                    drawPoint(restaurant.positionX, restaurant.positionY, restaurantColor, restaurant.name, false);
                });
            }

            drawAll();
        }
    }, [user, restaurants, navigate]);

    return (
        <>
        
            <canvas id="canvas" width={800} height={700}></canvas>
        </>
    );
}
