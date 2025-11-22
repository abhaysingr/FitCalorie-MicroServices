import React, { useState } from 'react';
import { addActivity } from '../services/api';
import { Sparkles, Activity, Flame, Timer, Loader2, CheckCircle, XCircle } from 'lucide-react';

const ActivityForm = ({ onActivityAdded }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [activity, setActivity] = useState({
        type: "RUNNING", 
        duration: '', 
        caloriesBurned: '',
        additionalMetrics: {}
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            // Parse numbers before sending 
            await addActivity({
                ...activity,
                duration: parseInt(activity.duration, 10),
                caloriesBurned: parseInt(activity.caloriesBurned, 10)
            });
            
            if (onActivityAdded) onActivityAdded();
            
            // Show success message
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            
            // Reset form
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: {} });
        } catch (error) {
            setError(error.message || "Failed to save activity. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Keyboard shortcut: Cmd/Ctrl + Enter to submit
    const handleKeyDown = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white min-h-screen flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto">
                
                {/* --- Header Section --- */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-8 h-8 text-yellow-300" />
                        <h2 className="text-4xl md:text-5xl font-bold">Track Your Fitness</h2>
                    </div>
                    <p className="text-xl text-blue-100">
                        Log your daily activities and hit your goals
                    </p>
                </div>

                {/* --- Form Card --- */}
                <div className="bg-white rounded-3xl p-8 text-gray-800 shadow-2xl">
                    <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                        <Activity className="text-blue-600" />
                        Enter Workout Details
                    </h3>
                    
                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 animate-pulse">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Activity saved successfully!</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            <span className="font-semibold">{error}</span>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6 mb-6">
                        
                        {/* 1. Activity Type Select */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-600">Activity Type</label>
                            <div className="relative">
                                <select 
                                    value={activity.type}
                                    onChange={(e) => setActivity({...activity, type: e.target.value})}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none appearance-none bg-white"
                                    disabled={loading}
                                >
                                    <option value="RUNNING">Running</option>
                                    <option value="WALKING">Walking</option>
                                    <option value="CYCLING">Cycling</option>
                                    <option value="SWIMMING">Swimming</option>
                                    <option value="YOGA">Yoga</option>
                                </select>
                                {/* Custom arrow for select box */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 2. Duration Input */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-600 flex items-center gap-1">
                                    <Timer className="w-4 h-4" /> Duration (minutes)
                                </label>
                                <input 
                                    type="number"
                                    min="1"
                                    max="1440"
                                    value={activity.duration}
                                    onChange={(e) => setActivity({...activity, duration: e.target.value})}
                                    placeholder="e.g. 30"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            {/* 3. Calories Input */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-600 flex items-center gap-1">
                                    <Flame className="w-4 h-4" /> Calories Burned
                                </label>
                                <input 
                                    type="number"
                                    min="0"
                                    max="10000"
                                    value={activity.caloriesBurned}
                                    onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
                                    placeholder="e.g. 250"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>

                        {/* 4. Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                <>
                                    Add Activity
                                </>
                            )}
                        </button>

                        {/* Hint text */}
                        <p className="text-center text-sm text-gray-500">
                            💡 Tip: Press Cmd/Ctrl + Enter to quickly submit
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ActivityForm;