"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react"; // Import ikon mata
import Image from "next/image"; // Import Image from next/image

export default function LoginPage() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            setTheme(savedTheme);
        }

        const observer = new MutationObserver(() => {
            const newTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
            setTheme(newTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
        const storedUser = Cookies.get("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            redirectBasedOnRole(user.role);
        }
    };

    const redirectBasedOnRole = (role: string) => {
        if (role === "admin") {
            router.push("/home");
        } else {
            router.push("/home");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-900 px-4">
            {/* Logo */}
            <div className="flex justify-center mb-6">
                <Image
                    className="h-14"
                    src={theme !== "dark" ? "/logo_horizontal_d.svg" : "/logo_horizontal.svg"}
                    alt="logo"
                    width={200} // Adjust width and height as needed
                    height={200}
                />
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-center text-white mb-6">
                Hatch Your Idea
            </h1>

            {/* Login Form Card */}
            <div className="w-full max-w-sm p-6 bg-gray-800 dark:bg-gray-700 rounded-lg shadow-lg">
                <h3 className="font-bold text-gray-100 dark:text-white text-lg">
                    Login Form
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">
                    Please fill the form
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-gray-100 dark:text-white font-semibold mb-1">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg bg-gray-900 text-white focus:outline-none p-2 text-sm pl-4"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-100 dark:text-white font-semibold mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle tipe input
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg bg-gray-900 text-white focus:outline-none p-2 text-sm pl-4"
                                required
                            />
                            {/* Tombol Lihat Password */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-200 dark:bg-white text-gray-900 dark:text-black p-3 rounded-lg font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-gray-400 dark:text-gray-300 text-sm">
                With Idea Generator V2.0 get daily fresh idea and monitor your competitors
            </p>
        </div>
    );
}