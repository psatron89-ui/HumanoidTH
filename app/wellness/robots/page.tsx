'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';

interface WellnessRobot {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  robotType: string;
  targetAudience: string;
  deployedCount: number;
  totalBenefit: number;
  wellnessImpactScore?: number;
  status: string;
  createdAt: string;
}

export default function RobotsPage() {
  const [robots, setRobots] = useState<WellnessRobot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await fetch('/api/wellness/robots');
        if (!response.ok) throw new Error('Failed to fetch robots');
        const data = await response.json();
        setRobots(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRobots();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Testing':
        return 'warning';
      case 'Retired':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading robots...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">🤖 Wellness Robots Registry</Typography>
        <Button variant="contained" color="primary">
          + Add Robot
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      {robots.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography>No wellness robots found. Start by adding a new robot!</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Manufacturer</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Target Audience</strong></TableCell>
                <TableCell align="center"><strong>Deployed</strong></TableCell>
                <TableCell align="center"><strong>Impact Score</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {robots.map((robot) => (
                <TableRow key={robot.id} hover>
                  <TableCell>{robot.name}</TableCell>
                  <TableCell>{robot.manufacturer}</TableCell>
                  <TableCell>{robot.robotType}</TableCell>
                  <TableCell>{robot.targetAudience}</TableCell>
                  <TableCell align="center">{robot.deployedCount}</TableCell>
                  <TableCell align="center">
                    {robot.wellnessImpactScore ? `${robot.wellnessImpactScore.toFixed(1)}/5.0` : '-'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={robot.status}
                      color={getStatusColor(robot.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/wellness/robots/${robot.id}`}>
                      <Button size="small" variant="outlined">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
