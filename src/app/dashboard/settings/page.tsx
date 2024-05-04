'use client'

import Terug from '@/app/components/ui/Terugknop/Terug';
import Heading from '@/app/components/ui/default/Heading';
import Divider from '@/app/components/ui/divider/Divider';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const SettingsPage: React.FC = () => {
    const [profileSettings, setProfileSettings] = useState({
        name: '',
        email: '',
        // Add more profile settings here
    });

    const [theme, setTheme] = useState('');

    useEffect(() => {
        // Load saved settings from local storage
        const savedProfileSettings = localStorage.getItem('profileSettings');
        if (savedProfileSettings) {
            setProfileSettings(JSON.parse(savedProfileSettings));
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        // Save settings to local storage whenever they change
        localStorage.setItem('profileSettings', JSON.stringify(profileSettings));
    }, [profileSettings]);

    useEffect(() => {
        // Save theme to local storage whenever it changes
        localStorage.setItem('theme', theme);
        // Apply the new theme to the app here (e.g., by updating CSS classes)
    }, [theme]);

    const handleProfileSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileSettings({
            ...profileSettings,
            [e.target.name]: e.target.value,
        });
    };

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
    };

    return (
        <div className="p-5">
            <div className="flex flex-col gap-4 w-1/2">
            <Terug />
            <Divider />
            <Heading title={" Instellingen"} />
                <div className="join w-full">
                    <div>
                        <input  type="text" placeholder="Username" className="input input-bordered w-full join-item" disabled />
                    </div>
                    <div className="w-full">
                        <input placeholder='@username' className="input input-bordered join-item !bg-white w-full" disabled type="email" name="email" value={profileSettings.email} onChange={handleProfileSettingsChange} />
                    </div>
                </div>

                <div className="join">
                    <div>
                        <input  type="text" placeholder="Email" className="input input-bordered w-full max-w-xs join-item" disabled />
                    </div>
                    <div className="w-full">
                        <input placeholder='@username' className="input input-bordered join-item !bg-white w-full" disabled type="email" name="email" value={profileSettings.email} onChange={handleProfileSettingsChange} />
                    </div>
                </div>
                <div>     
                    <h2 className="text-xl font-bold">Verander thema</h2>
                    <select className="select select-bordered w-full w-full" value={theme} onChange={handleThemeChange}>
                        <option value="">Default</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button className="btn btn-primary w-full">Save</button>
                    <button className="btn btn-error w-full">Account permanent verwijderen</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;