'use client';

import { motion } from "framer-motion"
import Link from "next/link"
import { useContext } from "react";
import { Context } from "./StoresProvider";
import { StoresType } from "@/types/StoresType";
import { observer } from "mobx-react-lite";

const NotFoundPage = () => {
    const { themeStore } = useContext(Context) as StoresType
    const isDarkMode = themeStore.isDarkMode

    return (
        <main className={`min-h-[79vh] flex items-center justify-center px-4 py-12 ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center"
            >
                <div className="relative mb-10">
                    <motion.div 
                        animate={{ 
                            rotate: [0, -5, 0, 5, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                        }}
                        className={`text-9xl font-bold tracking-tighter ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}
                    >
                        404
                    </motion.div>
                    
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className={`absolute -top-4 -right-6 w-12 h-12 rounded-full opacity-40 ${isDarkMode ? 'bg-gray-600' : 'bg-cyan-400'}`}
                    />
                    <motion.div 
                        animate={{ scale: [1, 0.8, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className={`absolute -bottom-2 -left-8 w-16 h-16 rounded-full opacity-30 ${isDarkMode ? 'bg-white' : 'bg-blue-400'}`}
                    />
                </div>

                <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Ой! Страница потерялась
                </h1>
                
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Похоже, вы пытаетесь открыть страницу, которая не существует или была перемещена. 
                    Проверьте адрес или вернитесь на главную.
                </p>
                
                <div className="mt-10">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link 
                            href="/" 
                            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Вернуться на главную
                        </Link>
                    </motion.div>
                </div>
                
                <div className="mt-16 flex justify-center space-x-4">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [0, -15, 0],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                            className="w-3 h-3 bg-indigo-400 rounded-full"
                        />
                    ))}
                </div>
            </motion.div>
        </main>
    )
}

export default observer(NotFoundPage)