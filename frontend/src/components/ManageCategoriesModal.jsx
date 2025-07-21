import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

function ManageCategoriesModal({ open, onClose }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', type: 'Expense' });

  const fetchCategories = async () => {
    const res = await fetch('/api/categories/');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    if (open) fetchCategories();
  }, [open]);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    await fetch('/api/categories/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', type: 'Expense' });
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/categories/${id}/`, { method: 'DELETE' });
    fetchCategories();
  };

  return (
    <Modal
        open={open}
        onClose={onClose}
        slotProps={{ backdrop: { invisible: true } }}
    >
      <Box
        sx={{
          width: 600,
          p: 4,
          borderRadius: '40px',
          mx: 'auto',
          my: '10vh',
          background: 'radial-gradient(circle, rgba(150,180,232,0.4) 0%, rgba(120,176,200,0.40) 100%)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(4px)',
          boxShadow: `
            inset 0px 4px 30px 9px rgba(255,255,255,0.25),
            6px 6px 18px rgba(0, 0, 0, 0.25)
          `,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Urbanist, sans-serif',
            fontWeight: 700,
            fontSize: '1.4rem',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Manage Categories
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Category Name"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
          />
          <TextField
            select
            label="Type"
            value={form.type}
            onChange={handleChange('type')}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="Expense">Expense</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Box>

        <List>
          {categories.map((cat) => (
            <ListItem
              key={cat.id}
              secondaryAction={
                <IconButton onClick={() => handleDelete(cat.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${cat.name} (${cat.type})`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
}

export default ManageCategoriesModal;
