import  { useEffect } from 'react';
import { StyledModal } from './Modal.styled';

export const Modal = ({closeModal, modalData}) => {
  
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
      <StyledModal onClick={handleOverlayClick}>
        <div className="modal">
                <img src={modalData.url} alt={modalData.alt} />
        </div>
      </StyledModal>
    );
}