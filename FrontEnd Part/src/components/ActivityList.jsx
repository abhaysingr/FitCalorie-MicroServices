import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, Box, Chip, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import { Calendar, Clock, Flame, TrendingUp } from 'lucide-react';
import { getActivities } from '../services/api';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const getActivityColor = (type) => {
    const colors = {
      Running: '#667eea',
      Walking: '#10b981',
      Cycling: '#f59e0b',
      Yoga: '#ec4899',
      Swimming: '#06b6d4',
      default: '#6366f1'
    };
    return colors[type] || colors.default;
  };

  const getActivityEmoji = (type) => {
    const emojis = {
      Running: '🏃',
      Walking: '🚶',
      Cycling: '🚴',
      Yoga: '🧘',
      Swimming: '🏊',
      default: '💪'
    };
    return emojis[type] || emojis.default;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* History Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          fontWeight="700" 
          sx={{ 
            mb: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          📊 Activity History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View all your logged workouts and track your progress
        </Typography>
      </Box>

      {activities.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary">
            No activities logged yet. Start tracking your fitness journey!
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {activities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    borderColor: getActivityColor(activity.type)
                  }
                }}
                onClick={() => navigate(`/activities/${activity.id}`)}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Activity Type Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: `${getActivityColor(activity.type)}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px'
                        }}
                      >
                        {getActivityEmoji(activity.type)}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight="700" color="text.primary">
                          {activity.type}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Workout Session
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      icon={<TrendingUp size={14} />}
                      label="View"
                      size="small"
                      sx={{
                        bgcolor: `${getActivityColor(activity.type)}15`,
                        color: getActivityColor(activity.type),
                        fontWeight: 600
                      }}
                    />
                  </Box>

                  {/* Stats Grid */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Duration */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        bgcolor: '#f8f9fa',
                        borderRadius: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 1.5,
                          bgcolor: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Clock size={18} color="#667eea" />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          Duration
                        </Typography>
                        <Typography variant="body1" fontWeight="700">
                          {activity.duration} min
                        </Typography>
                      </Box>
                    </Box>

                    {/* Calories */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        bgcolor: '#f8f9fa',
                        borderRadius: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 1.5,
                          bgcolor: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Flame size={18} color="#ef4444" />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          Calories Burned
                        </Typography>
                        <Typography variant="body1" fontWeight="700">
                          {activity.caloriesBurned} cal
                        </Typography>
                      </Box>
                    </Box>

                    {/* Date */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        pt: 1,
                        borderTop: '1px solid #e5e7eb'
                      }}
                    >
                      <Calendar size={14} color="#9ca3af" />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(activity.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {new Date(activity.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ActivityList;