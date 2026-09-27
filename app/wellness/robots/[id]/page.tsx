'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface WellnessRobot {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  robotType: string;
  targetAudience: string;
  capabilities: string[];
  deploymentLocations: string[];
  deployedCount: number;
  totalBenefit: number;
  wellnessImpactScore?: number;
  status: string;
  lastMaintenanceDate?: string;
  createdAt: string;
}

export default function RobotDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const [robot, setRobot] = useState<WellnessRobot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRobot = async () => {
      try {
        const response = await fetch(`/api/wellness/robots/${id}`);
        if (!response.ok) throw new Error('Failed to fetch robot');
        const data = await response.json();
        setRobot(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRobot();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error || !robot) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error || 'Robot not found'}</Typography>
      </Container>
    );
  }

  const impactScore = robot.wellnessImpactScore || 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        href="/wellness/robots"
        sx={{ mb: 2 }}
      >
        Back to List
      </Button>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {robot.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {robot.manufacturer} • Model: {robot.model}
                </Typography>
              </Box>
              <Chip label={robot.status} color="primary" />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 1 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Robot Type
                </Typography>
                <Typography variant="body1">{robot.robotType}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Target Audience
                </Typography>
                <Typography variant="body1">{robot.targetAudience}</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📊 Impact Metrics
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Deployed Units
                </Typography>
                <Typography variant="h4">{robot.deployedCount}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Total Beneficiaries
                </Typography>
                <Typography variant="h4">{robot.totalBenefit.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                  Wellness Impact Score
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={impactScore * 20}
                  sx={{ height: 10, borderRadius: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {impactScore.toFixed(1)} / 5.0
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🎯 Capabilities
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {robot.capabilities.length > 0 ? (
                robot.capabilities.map((cap, idx) => (
                  <Chip key={idx} label={cap} variant="outlined" />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No capabilities listed
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📍 Deployment Locations
            </Typography>
            <List dense>
              {robot.deploymentLocations.length > 0 ? (
                robot.deploymentLocations.map((loc, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={loc} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No deployments yet" />
                </ListItem>
              )}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ℹ️ Details
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={robot.status}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Created"
                  secondary={new Date(robot.createdAt).toLocaleDateString()}
                />
              </ListItem>
              {robot.lastMaintenanceDate && (
                <ListItem>
                  <ListItemText
                    primary="Last Maintenance"
                    secondary={new Date(robot.lastMaintenanceDate).toLocaleDateString()}
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
