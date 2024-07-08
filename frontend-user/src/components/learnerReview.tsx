import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { ThumbDown } from '@mui/icons-material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Rating } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function LearnerReview() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{
      width: 1,
      height: 300
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            R
          </Avatar>
        }
        title={<div>
          <p className={'font-bold'}>User id here</p>
          <p>xx/xx/xxxx</p>
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        </div>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non sem vitae justo gravida rhoncus dignissim
          et purus. Maecenas accumsan lacus dignissim elit malesuada hendrerit. Nullam scelerisque lectus venenatis
          tellus condimentum, ut sollicitudin eros ornare.
        </Typography>
      </CardContent>
      <CardActions className={'flex-row justify-start space-x-8 justify-center'}>
        <p>1000</p>
        <IconButton aria-label="Likes">
          <ThumbUpIcon />
        </IconButton>
        <p>2000</p>
        <IconButton aria-label="Dislikes">
          <ThumbDown />
        </IconButton>
      </CardActions>
    </Card>
  );
}
