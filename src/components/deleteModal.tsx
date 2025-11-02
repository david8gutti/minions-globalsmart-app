"use client";

// Componente: DeleteModal
// Muestra un modal de confirmación antes de eliminar un elemento.
// Incluye un mensaje personalizado y dos acciones: confirmar o cancelar.
//
// Decisiones de diseño:
// - El componente es controlado externamente (via `isOpen`, `onClose`, `onConfirm`), lo que facilita su reutilización.
//
// Props:
// - isOpen: boolean → controla si el modal está visible o no.
// - onClose: () => void → función que se ejecuta al cerrar el modal (por ejemplo, al cancelar o hacer clic fuera).
// - onConfirm: () => void → función que se ejecuta al confirmar la acción de eliminación.
// - title?: string → título del modal (opcional).
// - message?: string → mensaje explicativo dentro del modal (opcional).

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <ExclamationCircleIcon className="mx-auto mb-3 h-15 w-15 text-gray-500 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-200">
              {message}
            </h3>
            <div className="flex justify-center gap-4 mb-5">
              <Button color="danger" onPress={onConfirm}>
                Sí, eliminar
              </Button>
              <Button onPress={onClose}>Cancelar</Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
