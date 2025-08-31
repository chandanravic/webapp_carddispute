import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface DisputeStatusChipProps {
  status: string;
}

const DisputeStatusChip: React.FC<DisputeStatusChipProps> = ({ status }) => {
  const getStatusConfig = (status: string): { label: string; color: ChipProps['color'] } => {
    switch (status.toUpperCase()) {
      case 'OPEN':
        return { label: 'Open', color: 'warning' as const };
      case 'IN_PROGRESS':
        return { label: 'In Progress', color: 'info' as const };
      case 'RESOLVED':
        return { label: 'Resolved', color: 'success' as const };
      case 'CLOSED':
        return { label: 'Closed', color: 'default' as const };
      default:
        return { label: status, color: 'default' as const };
    }
  };

  const { label, color } = getStatusConfig(status);

  return <Chip label={label} color={color} size="small" />;
};

export default DisputeStatusChip;
