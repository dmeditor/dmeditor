import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { BrowseLinkCallbackParams } from 'dmeditor/config';

const LinkList = [
  {
    href: 'https://www.google.com',
    text: 'Google',
    id: 1,
  },
  {
    href: 'https://www.facebook.com',
    text: 'Facebook',
    id: 2,
  },
];

export function BrowseLink(props: {
  value: BrowseLinkCallbackParams;
  onChange: (value: BrowseLinkCallbackParams) => void;
}) {
  const { onChange, value } = props;

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: { href: string; text: string; id: number },
  ) => {
    onChange(item.href);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        {LinkList.map((item) => (
          <ListItemButton
            key={item.id}
            selected={value === item.href}
            onClick={(event) => handleListItemClick(event, item)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
