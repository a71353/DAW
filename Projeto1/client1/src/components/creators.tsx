import React from 'react';
import Navigation from './Navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const creatorsData = [
  {
    name: 'António Afonso',
    bio: 'António Afonso, 21 years old from Albufeira, a computer engineering student.',
    imageUrl: '/toni.png'
  },

  {
    name: 'Gonçalo Figueiredo',
    bio: 'Gonçalo Figueredo is a Student of Computer Science Engineering at the University of Algarve. Passionate about basketball and hopes to combine the degree and the sport. Email: a71353@ualg.pt',
    imageUrl: '/goncalo.png'
  },

  {
    name: 'Tomás Rodrigues',
    bio: 'Tomás Rodrigues is a 22-year-old student currently studying computer science at the University of Algarve. With a passion for web development, he spends much of his time learning about and exploring the latest technologies and techniques used in this field. Email: a67382@ualg.pt',
    imageUrl: 'tomas.png'
  },

];

const Creators = () => {
  return (
    <>
      <Navigation />
      <Container maxWidth="xl" sx={{ marginBottom: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {creatorsData.map((creator, index) => (
            <Card key={index} sx={{ display: 'flex', width: '100%', my: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={creator.imageUrl}
                alt={`Imagem de ${creator.name}`}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {creator.name}
                  </Typography>
                  <Typography variant="body1">
                    {creator.bio}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};


export default Creators;
