"use client";

import { HiOutlineExclamationCircle } from "react-icons/hi";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function DeleteModal({
  show,
  onClose,
  onConfirm,
  title = "Eliminar elemento",
  message = "¿Seguro que quieres eliminar este elemento?",
}: DeleteModalProps) {
/*   return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={onConfirm}>
              Sí, eliminar
            </Button>
            <Button color="alternative" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  ); */
}
