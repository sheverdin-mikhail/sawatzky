import { classNames } from 'shared/lib/classNames/classNames';
import {
  ChangeEvent, DragEvent, useCallback, useState,
} from 'react';
import cls from './FileInput.module.scss';

interface FileInputProps {
  className?: string;
  label?: any;
  id?: string;
  file?: File;
  onFileChange?: (file: File) => void;
}

export const FileInput: React.FC<FileInputProps> = (props) => {
  const {
    className,
    id,
    label,
    file,
    onFileChange,
  } = props;

  const [drag, setDrag] = useState(false);

  const dragStartHandler = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDrag(true);
  }, []);

  const dragLeaveHandler = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
  }, []);

  const dragDropHandler = useCallback((e: DragEvent) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    onFileChange?.(files[0]);
    setDrag(false);
  }, [onFileChange]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    onFileChange?.(files!![0]);
  }, [onFileChange]);

  return (
    <div
      className={classNames(cls.fileInput, {}, [className])}
      onDragStart={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragStartHandler}
    >
      <div className={cls.fileContent}>
        {
          drag && (
            <div className={cls.dropField} onDrop={dragDropHandler}>
              <div className={cls.dropBorder} />
            </div>
          )
        }
        {
          file && <span className={cls.fileName}>Выбранный файл: <a href={`${URL.createObjectURL(file)}`} download={file.name}>{file.name}</a> </span>
        }
        <input type="file" onChange={(e) => onChangeHandler(e)} id={`${id}`} className={cls.input} />
        <label htmlFor={`${id}`} className={cls.label}> {label} </label>
      </div>
    </div>
  );
};
