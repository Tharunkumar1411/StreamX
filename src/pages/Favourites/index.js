import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RemoveFav from '@mui/icons-material/DoNotDisturbOnOutlined';
import ConfirmDeletePopup from '../../components/ConfirmDeletePopup';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { updateFavourites } from '../../store/actions/homeAction';

const CardContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '1rem',
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
});

export default function Favorites() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteRef = React.useRef();
    const handleClick = (playerData) => {
        navigate("/player", {state: {playerData}})
    }
    const favourites = useSelector(state => state?.home?.movieList?.searchFavResult ?? state?.home?.movieList?.favourites);

    const handleRemoveFav = (data) => {
        deleteRef?.current?.openDialog?.(data);
    }

    const swapIndexObjects = async(data, current, destination) => {
        const newData = [...data];
    
        [newData[current], newData[destination]] = [newData[destination], newData[current]];
    
        return newData;
    }
    
    const handleDragEnd = async(result) => {
        if (!result.destination) return;

        let destinationIndex = result?.destination?.index;
        let currentIndex = result?.source?.index;
        const fav = favourites
        const resultObj = await swapIndexObjects(fav, currentIndex, destinationIndex)
        dispatch(updateFavourites(resultObj))
    }

    return (
        <>
            {(favourites?.length) ? 
            <>
                <h1 className="text-white ml-9 mt-4 mb-2 font-bold">Favourites </h1>
                <DragDropContext onDragEnd={handleDragEnd}>
                    
                    <Droppable droppableId="favourites">
                        {(provided) => (
                            <CardContainer className="m-4" {...provided.droppableProps} ref={provided.innerRef}>
                                {favourites.map((data, index) => (
                                    <Draggable key={index} draggableId={`draggable-${index}`} index={index}>
                                        {(provided) => (
                                            <Card
                                                sx={{ maxWidth: 305, border:"1px solid white", marginLeft:"auto", marginRight:"auto" }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <CardHeader
                                                    avatar={
                                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                            {data?.title[0]}
                                                        </Avatar>
                                                    }
                                                    action={ 
                                                        <IconButton aria-label="add to favorites" onClick={()  => handleRemoveFav(data)}>
                                                            <RemoveFav />
                                                        </IconButton>
                                                    }
                                                    title={data?.title}
                                                    subheader={data?.subtitle}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    height="194"
                                                    image={`https://storage.googleapis.com/gtv-videos-bucket/sample/${data?.thumb}`}
                                                    alt="fav image"
                                                    onClick={() => handleClick(data)}
                                                />
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </CardContainer>
                        )}
                    </Droppable>
                    <ConfirmDeletePopup ref={deleteRef} from="fav"/>
                </DragDropContext> </>
            :  
                <div className="flex justify-center items-center mt-40">
                    <div className="text-white font-bold">
                        Nothing Marked as Favourites
                    </div>
                </div>
            }
        </>
    );
}
