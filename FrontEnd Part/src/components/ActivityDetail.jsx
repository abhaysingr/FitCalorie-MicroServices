import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getActivityDetail } from '../services/api';
import { Box, Card, CardContent, Divider, Typography, CircularProgress, Alert, Chip, Grid, IconButton } from '@mui/material';
import { Activity, TrendingUp, Lightbulb, Shield, Calendar, Flame, Clock, ArrowLeft } from 'lucide-react';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getActivityDetail(id);
        const activityData = response.data?.activity || response.data;
        setActivity(activityData);
      } catch (error) {
        console.error('Error fetching activity:', error);
        setError(error.message || 'Failed to load activity details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivityDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={50} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      </Box>
    );
  }

  if (!activity) {
    return (
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        <Alert severity="warning" sx={{ borderRadius: 2 }}>Activity not found</Alert>
      </Box>
    );
  }

  const activityType = activity.type || activity.activityType || 'N/A';
  const duration = activity.duration || activity.durationMinutes || activity.timeSpent || 'N/A';
  const calories = activity.caloriesBurned || activity.calories_burned || activity.calories || 'N/A';
  const date = activity.createdAt || activity.created_at || activity.date;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 3 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Back Button */}
      <Box sx={{ mb: 2 }}>
        <IconButton
          onClick={() => navigate('/activities')}
          sx={{
            bgcolor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: '#f5f5f5',
              transform: 'translateX(-4px)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <ArrowLeft size={20} />
        </IconButton>
      </Box>

      {/* Header Card */}
      <Card 
        sx={{ 
          mb: 3, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                p: 1.5, 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Activity size={32} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="700" sx={{ mb: 0.5 }}>
                {activityType}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Activity Session Details
              </Typography>
            </Box>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  p: 2.5, 
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Clock size={20} />
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Duration</Typography>
                </Box>
               <Typography variant="h5" fontWeight="700">
  {duration && duration !== 'N/A' ? `${duration} min` : 'N/A'}
</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  p: 2.5, 
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Flame size={20} />
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Calories</Typography>
                </Box>
                <Typography variant="h5" fontWeight="700">
  {calories && calories !== 'N/A' ? calories : 'N/A'}
</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  p: 2.5, 
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Calendar size={20} />
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Date</Typography>
                </Box>
                <Typography variant="body2" fontWeight="600">
                  {date ? new Date(date).toLocaleDateString() : 'N/A'}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {date ? new Date(date).toLocaleTimeString() : ''}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* AI Recommendation Card */}
      {activity.recommendation && (
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box 
                sx={{ 
                  bgcolor: '#f0f4ff', 
                  p: 1.5, 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <TrendingUp size={24} color="#667eea" />
              </Box>
              <Typography variant="h5" fontWeight="700" color="text.primary">
                AI-Powered Insights
              </Typography>
            </Box>

            {/* Analysis Section */}
            <Box 
              sx={{ 
                bgcolor: '#fafbfc', 
                p: 3, 
                borderRadius: 2, 
                borderLeft: '4px solid #667eea',
                mb: 3
              }}
            >
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: '#667eea' }}>
                📊 Analysis
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary', 
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap'
                }}
              >
                {activity.recommendation}
              </Typography>
            </Box>

            {/* Improvements Section */}
            {activity.improvements && activity.improvements.length > 0 && (
              <Box 
                sx={{ 
                  bgcolor: '#f0fdf4', 
                  p: 3, 
                  borderRadius: 2, 
                  borderLeft: '4px solid #10b981',
                  mb: 3
                }}
              >
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: '#10b981' }}>
                  💪 Areas for Improvement
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    • {activity.improvements[0]}
                  </Typography>
                  {activity.improvements[1] && (
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      • {activity.improvements[1]}
                    </Typography>
                  )}
                  {activity.improvements[2] && (
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      • {activity.improvements[2]}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {/* Suggestions Section */}
            {activity.suggestions && activity.suggestions.length > 0 && (
              <Box 
                sx={{ 
                  bgcolor: '#fffbeb', 
                  p: 3, 
                  borderRadius: 2, 
                  borderLeft: '4px solid #f59e0b',
                  mb: 3
                }}
              >
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: '#f59e0b' }}>
                  💡 Recommendations
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    • {activity.suggestions[0]}
                  </Typography>
                  {activity.suggestions[1] && (
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      • {activity.suggestions[1]}
                    </Typography>
                  )}
                  {activity.suggestions[2] && (
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      • {activity.suggestions[2]}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {/* Safety Guidelines Section */}
            {activity.safety && activity.safety.length > 0 && (
              <Box 
                sx={{ 
                  bgcolor: '#fef2f2', 
                  p: 3, 
                  borderRadius: 2, 
                  borderLeft: '4px solid #ef4444'
                }}
              >
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: '#ef4444' }}>
                  🛡️ Safety Guidelines
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    • {activity.safety[0]}
                  </Typography>
                  {activity.safety[1] && (
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      • {activity.safety[1]}
                    </Typography>
                  )}
                  {activity.safety[2] && (
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      • {activity.safety[2]}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetail;