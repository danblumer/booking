
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { CardContainer, CardFooter, CardContent, CardPriceContent, CardReviewContent } from "./styled";
import { Button } from "@mui/material";
import { Hotel } from "../../types/Interfaces";
import { formatCurrency } from "../../utils/numberUtils";

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
            <b>{hotelData.country} / {hotelData.city}</b>
          </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <b>Facilities</b>
              </Typography>
          
            {hotelData.facilities.map((item) => (
              <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            > <b>- {item}</b></Typography>
            ))}
          
          <CardFooter>
            <CardReviewContent>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {hotelData.rating} stars
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {hotelData.reviewCount} reviews
              </Typography>
            </CardReviewContent>
            <CardPriceContent>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <b>Price:</b> {formatCurrency(hotelData.price)}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <b>Total:</b> {formatCurrency(totalPrice)}
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
