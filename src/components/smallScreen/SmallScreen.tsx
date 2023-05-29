import {createRef, useEffect} from "react";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

function SmallScreen(props: any) {
  const videoRef=createRef<any>()
  useEffect(()=>{
    videoRef.current.srcObject=props.stream
  }, [])
  return (
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
    >
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
          />
        </CardCover>
        <CardContent>
          <Typography
            level="h6"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            Video
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
export default SmallScreen;
