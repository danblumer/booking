
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { CardContainer, CardFooter, CardContent, CardPriceContent, CardReviewContent } from "./styled";
import { Button } from "@mui/material";
import { Hotel } from "../../types/Interfaces";

type HotelCardProps = {
  hotelData: Hotel;
  totalPrice: number;
  handleSelectHotel: (selectedHotel?: Hotel) => void;
};

const HotelCard = ({
  hotelData,
  totalPrice,
  handleSelectHotel,
}: HotelCardProps) => {
  return (
    <CardContainer>
      <CardMedia
        component="img"
        sx={{ width: 200, height: 200 }}
        image="/images/download.jpg"
        alt="Live from space album cover"
      />
      <CardContent>
        <CardContent>
          <Typography component="div" variant="h5">
            {hotelData.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {hotelData.country} / {hotelData.city}
          </Typography>
          {hotelData.amenities.map((amenity) => (
            <div>{amenity}</div>
          ))}
          <CardFooter>
            <CardReviewContent>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {hotelData.rating} - {hotelData.reviewCount} reviews
              </Typography>
            </CardReviewContent>
            <CardPriceContent>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                from US$ {hotelData.price}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Total US$ {totalPrice}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  handleSelectHotel(hotelData);
                }}
              >
                BOOK
              </Button>
            </CardPriceContent>
          </CardFooter>
        </CardContent>
      </CardContent>
    </CardContainer>
  );
};

export default HotelCard;
