'use client';

import Link from 'next/link';
import {
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import RobotIcon from '@mui/icons-material/SmartToy';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function WellnessPage() {
  const features = [
    {
      title: '🤖 Robot Wellness Registry',
      description:
        'Browse and manage wellness robots used for elderly care, rehabilitation, and mental health support across Thailand.',
      icon: RobotIcon,
      href: '/wellness/robots',
    },
    {
      title: '👥 Community Contributors',
      description:
        'Discover researchers, developers, and clinicians working on wellness robotics projects.',
      icon: PeopleIcon,
      href: '#',
    },
    {
      title: '📊 Wellness Analytics',
      description:
        'Analyze trends, sentiment, and impact metrics for wellness robotics initiatives.',
      icon: AnalyticsIcon,
      href: '#',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          🏥 HRI Wellness Living Lab
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Building compassionate robotics for elderly care and community wellness in Thailand
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
        {features.map((feature, idx) => (
          <Box key={idx}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-8px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="textSecondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                {feature.href !== '#' ? (
                  <Link href={feature.href} style={{ textDecoration: 'none', width: '100%' }}>
                    <Button fullWidth variant="contained" color="primary">
                      Explore
                    </Button>
                  </Link>
                ) : (
                  <Button fullWidth variant="outlined" disabled>
                    Coming Soon
                  </Button>
                )}
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      <Paper sx={{ p: 4, mt: 8, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          📌 About This Initiative
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The HRI Wellness Living Lab is part of Thailand Humanoid Atlas, showcasing how humanoid
          robotics can improve quality of life for vulnerable populations. Our registry tracks
          wellness robots deployed across Thailand, documents contributor communities, and analyzes
          long-term impact on elderly care, rehabilitation, and mental health support.
        </Typography>
        <Typography variant="body1">
          This feature was developed for the HRI Hackathon Thailand 2026 as part of the Theme Feature
          implementation for Hack Day 1.
        </Typography>
      </Paper>
    </Container>
  );
}
