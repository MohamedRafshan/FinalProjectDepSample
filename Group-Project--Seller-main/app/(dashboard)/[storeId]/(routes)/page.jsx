

import getTotalRevenue from '@/actions/analytics/get-totalRevenue';
import getTotalOrderCount from '@/actions/analytics/get-totalOrders';
import getProducts from '@/actions/analytics/get-products';
import getTopDiscountedProducts from '@/actions/analytics/get-topDisproduct';
import getTopSellingProducts from '@/actions/analytics/get-TopSellProduct';



import Heading from "@/components/ui/heading";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Package,Star  } from "lucide-react";
import TotalRevenue from './components/totalRevenue'
import TotalOrders from './components/totalOrders';
import getCategories from '@/actions/get-categories';
import SalesAnalytics from './components/salesAnalitics';
import RevenueAnalytics from './components/revenueAnalytics';
import TopDiscountedList from './components/TopDiscountedList';
import TopSellingList from './components/topSellingList';
import { ScrollArea } from "@/components/ui/scroll-area"
import LowStock from './components/lowStockTable';
import Reports from './components/reports';
import getStoreRating from '@/actions/analytics/get-storeRatings';


const DashboardPage = async({params}) => {

    const totalRevenue = await getTotalRevenue(params.storeId)
    const totalOrders = await getTotalOrderCount(params.storeId)
    const categories = await  getCategories(params.storeId)
    const products = await getProducts(params.storeId)
    const topDiscountedProducts = await getTopDiscountedProducts(params.storeId)
    const topSelling = await getTopSellingProducts(params.storeId)
    const rate =  await getStoreRating(params.storeId)

 

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading
                    title="Dashboard"
                    description="Overview of your store's performance and sales."
                />
                <Separator/>
                <div className="grid  grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                            <CardTitle className="text-sm font-medium"> 
                                Total Revenue
                            </CardTitle>
                            <DollarSign
                                className="w-4 h-4 text-muted-foreground"
                            />
                        </CardHeader>

                        <CardContent >
                            <div className="text-2xl font-bold my-4">
                                <TotalRevenue amount={totalRevenue}/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                            <CardTitle className="text-sm font-medium"> 
                                Total Orders
                            </CardTitle>
                            <Package
                                className="w-4 h-4 text-muted-foreground"
                            />
                        </CardHeader>

                        <CardContent >
                            <div className="text-2xl font-bold my-4">
                            <TotalOrders amount={totalOrders}/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                        <CardTitle className="text-sm font-medium"> 
                                Store Ratings
                            </CardTitle>
                            <Star 
                                className="w-4 h-4 text-muted-foreground"
                            />
                        </CardHeader>

                        <CardContent >
                            <div className="text-2xl font-bold my-4">
                                {rate}  / 5
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Revenue Analytics</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                        <RevenueAnalytics categories={categories} products={products} storeId ={params.storeId}/>

                        </CardContent>

                    </Card>
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className ="text-xl font-semibold">Top discounted products</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ScrollArea className="w-full px-3">
                                <TopDiscountedList list={topDiscountedProducts}/>
                            </ScrollArea>
                        </CardContent>

                    </Card>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Card className="col-span-3">
                        <CardHeader>
                            <div>
                                <CardTitle className="justify-between items-center flex">
                                    Orders Analytics
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <SalesAnalytics categories={categories} products={products} storeId ={params.storeId}/>

                        </CardContent>

                    </Card>
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className ="text-xl font-semibold">Top 10 selling products</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ScrollArea className="w-full px-3">
                                <TopSellingList list={topSelling}/>
                            </ScrollArea>
                        </CardContent>

                    </Card>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>low stocks</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <LowStock storeId={params.storeId}/>
                        </CardContent>

                    </Card>
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Reports</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <p className="pl-1 pt-4 text-sm">Sales</p>
                            <Reports categories={categories} products={products} storeId={params.storeId}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
     );
}

export default DashboardPage;