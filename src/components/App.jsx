import { useState, useEffect } from 'react'
import { StyledApp } from './App.styled'
import { SearchBar } from './Searchbar/Searchbar'
import { fetchImages } from './Api/api'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem'
import Loader from './Loader/Loader'
import Button from './Button/Button'
import { Modal } from './Modal/Modal'

export const App = () => {
  
  const [searchWord, setSearchWord] = useState(null);
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    if (!searchWord) {
      return;
    };
    const fetchImgs = async () => {
    try {
      setIsLoading(true);
      setIsShown(false);
      
      const result = await fetchImages(searchWord, page)
     
      if (page>1) {
        setImages(prev => [...prev, ...result.hits]);
        setIsShown(true);
      } else {
        setImages([...result.hits]);
        setIsShown(true);
      };
      
      if (result.hits.length <= 11) {
        setIsShown(false)
      };

      const scrollDown = () => {
        window.scrollBy({
          top: 500,
          behavior: "smooth",
        })
      };
      
      await scrollDown();

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
    fetchImgs();
 
  }, [searchWord, page]);
  
  const openModal = data => {
    setIsOpenModal(true);
    setModalData(data);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
  };

  const onSubmit = searchQuery => {
    setSearchWord(searchQuery);
    setPage(1);
    setImages(null);
  };
    
  const onLoadMoreHandler = () => {
    setPage(page => page + 1);
  };

    return (
      <StyledApp >
        <SearchBar onSubmit={onSubmit} />
         {error !== null && (
          <p className="error-bage">
            Oops, some error occured... Error message: {error}
          </p>
        )}
        <ImageGallery>
          {images !== null && <ImageGalleryItem data={images} openModal={openModal} />}
        </ImageGallery> 
         {isLoading && <Loader />}
        {images !== null && isShown && <Button onLoadMoreHandler={onLoadMoreHandler} />}
        {isOpenModal && (
          <Modal
            closeModal={closeModal}
            modalData={modalData}
          />
        )}
      </StyledApp>
    )
  
};


