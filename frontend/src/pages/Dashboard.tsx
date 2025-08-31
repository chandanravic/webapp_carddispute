import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { formatCurrency } from '../utils/formatters';
import DisputeStatusChip from '../components/DisputeStatusChip';

interface Dispute {
  id: string;
  externalId: string;
  processor: 'STRIPE' | 'PAYPAL';
  amount: number;
  currency: string;
  reason: string;
  status: string;
  customerEmail?: string;
  transactionDate: string;
  createdAt: string;
  assignedTo?: {
    name: string;
  };
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);

  const { data: disputes = [], refetch } = useQuery<Dispute[]>(
    'disputes',
    async () => {
      const response = await api.get('/disputes');
      return response.data;
    },
    {
      refetchInterval: 30000, // Refresh every 30 seconds
    }
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleViewDispute = (id: string) => {
    navigate(`/disputes/${id}`);
  };

  const getStats = () => {
    const total = disputes.length;
    const open = disputes.filter(d => d.status === 'OPEN').length;
    const inProgress = disputes.filter(d => d.status === 'IN_PROGRESS').length;
    const resolved = disputes.filter(d => d.status === 'RESOLVED').length;
    const totalAmount = disputes.reduce((sum, d) => sum + d.amount, 0);

    return { total, open, inProgress, resolved, totalAmount };
  };

  const stats = getStats();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          Refresh
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Disputes
              </Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Open
              </Typography>
              <Typography variant="h4" color="warning.main">{stats.open}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" color="info.main">{stats.inProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="h4" color="success.main">
                {formatCurrency(stats.totalAmount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Disputes List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Disputes
        </Typography>
        
        {disputes.length === 0 ? (
          <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
            No disputes found
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {disputes.slice(0, 10).map((dispute) => (
              <Grid item xs={12} key={dispute.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          {dispute.externalId}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Chip label={dispute.processor} size="small" />
                          <DisputeStatusChip status={dispute.status} />
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          Amount: {formatCurrency(dispute.amount)} | Reason: {dispute.reason}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Customer: {dispute.customerEmail || 'N/A'}
                        </Typography>
                      </Box>
                      <Box>
                        <Tooltip title="View Details">
                          <IconButton onClick={() => handleViewDispute(dispute.id)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
