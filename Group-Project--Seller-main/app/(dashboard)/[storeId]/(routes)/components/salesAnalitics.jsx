'use client'

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

import axios from 'axios';

const SalesAnalytics = ({ categories, products, storeId }) => {

    const [isMounted, setIsMounted] = useState(false);
    const [category, setCategory] = useState('all');
    const [product, setProduct] = useState('all');
    const [duration, setDuration] = useState('monthly');
    const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            fetchSalesData();
        }
    }, [category, product, duration, isMounted]);

    const fetchSalesData = async () => {
        try {
            const response = await axios.get(`/api/${storeId}/analytics/sales`, {
                params: { category, product, duration }
            });

            const formattedData = formatSalesData(response.data, duration);
            setSalesData(formattedData);
        } catch (error) {
            console.error('Error fetching sales data', error);
        }
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        if (value !== 'all') {
            setProduct('all');
        }
    };

    const handleProductChange = (value) => {
        setProduct(value);
        if (value !== 'all') {
            setCategory('all');
        }
    };

    const handleDurationChange = (value) => setDuration(value);

    const formatSalesData = (data, duration) => {
        let labels = [];
        let formattedData = [];
    
        const currentDate = new Date();
        if (duration === 'weekly') {
            for (let i = 6; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);
                labels.push(date.toISOString().split('T')[0]);
            }
        } else if (duration === 'monthly') {
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            for (let i = daysInMonth - 1; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);
                labels.push(date.toISOString().split('T')[0]);
            }
        } else if (duration === 'yearly') {
            for (let i = 0; i < 12; i++) {
                const date = new Date(currentDate.getFullYear(), i, 1);
                labels.push(date.toISOString().substring(0, 7)); // Get year-month format
            }
        }
    
        labels.forEach(label => {
            let count = 0;
            if (duration === 'yearly') {
                // Extract year-month for yearly comparison
                const yearMonth = label.substring(0, 7);
                data.forEach(item => {
                    if (item.label.substring(0, 7) === yearMonth) {
                        count += item.value;
                    }
                });
            } else {
                count = data.find(item => item.label === label)?.value || 0;
            }
            formattedData.push(count);
        });
    
        return { labels, datasets: [{ label: 'Number of Orders', data: formattedData }] };
    };

    if (!isMounted) {
        return null;
    }

    const chartData = {
        labels: salesData.labels || [],
        datasets: [
            {
                label: 'Number of Orders',
                data: salesData.datasets[0]?.data || [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className="flex gap-3 mt-4">
                <Select onValueChange={handleCategoryChange} disabled={product !== 'all'} defaultValue="all">
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key="all" value="all">
                            All
                        </SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={handleProductChange} disabled={category !== 'all'} defaultValue="all">
                    <SelectTrigger>
                        <SelectValue placeholder="Products" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key="all" value="all">
                            All
                        </SelectItem>
                        {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                                {product.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={handleDurationChange} defaultValue="monthly">
                    <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="weekly">
                            Weekly
                        </SelectItem>
                        <SelectItem value="monthly">
                            Monthly
                        </SelectItem>
                        <SelectItem value="yearly">
                            Yearly
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Bar data={chartData} />
        </>
    );
}

export default SalesAnalytics;
