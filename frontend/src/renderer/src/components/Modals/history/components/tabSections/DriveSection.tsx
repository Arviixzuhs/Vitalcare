import {
  Card,
  Input,
  Modal,
  Button,
  CardBody,
  Dropdown,
  ModalBody,
  CardHeader,
  Breadcrumbs,
  ModalFooter,
  ModalHeader,
  DropdownItem,
  DropdownMenu,
  ModalContent,
  BreadcrumbItem,
  DropdownTrigger,
} from '@nextui-org/react'
import {
  reqCreateFile,
  reqDeleteFile,
  reqFileUpload,
  reqRenameFile,
  reqFindFilesByFolderPath,
} from '@renderer/api/Requests'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { EmptyTableContent } from '@renderer/components/TableUser/components/EmptyContent'
import { RootState } from '@renderer/store'
import {
  Edit,
  Trash2,
  Upload,
  Download,
  HomeIcon,
  FileIcon,
  FolderIcon,
  FolderPlus,
  SearchIcon,
  MoreVerticalIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface FileModel {
  id: number
  name: string
  path: string
  fileURL: string
  isFolder: boolean
  contentType: string
}

export const DriveSection = () => {
  const [files, setFiles] = useState<FileModel[]>([])
  const [filteredFiles, setFilteredFiles] = useState<FileModel[]>([])
  const currentPatientId = useSelector((state: RootState) => state.users.currentUserIdEdit)
  const [currentPath, setCurrentPath] = useState<string>(`/patient-${currentPatientId}`)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [newItemName, setNewItemName] = useState<string>('')
  const [isCreatingFolder, setIsCreatingFolder] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<FileModel | null>(null)
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  const fetchFiles = async (path: string) => {
    try {
      const { data } = await reqFindFilesByFolderPath(path)
      setFiles(data)
      setFilteredFiles(data)
    } catch (error) {
      console.error('Error al obtener archivos:', error)
    }
  }

  const createItem = async () => {
    if (!newItemName || (!isCreatingFolder && !uploadFile)) {
      return
    }
    try {
      const fullPath = `${currentPath}/${newItemName}`.replace('//', '/')
      let fileURL: null | string = null
      let contentType: Blob['type'] = ''

      if (uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile)
        formData.append('path', currentPath)
        contentType = uploadFile.type
        const response = await reqFileUpload(formData)
        fileURL = response.data.fileUrl
      }

      const itemData = {
        name: newItemName,
        path: fullPath,
        isFolder: isCreatingFolder,
        fileURL,
        contentType,
      }

      await reqCreateFile(itemData)
      fetchFiles(currentPath)
      setNewItemName('')
      setUploadFile(null)
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('Error al crear elemento:', error)
    }
  }

  const deleteItem = async () => {
    if (!selectedFile) return
    try {
      await reqDeleteFile(selectedFile.id)
      fetchFiles(currentPath)
      setIsDeleteModalOpen(false)
      setSelectedFile(null)
    } catch (error) {
      console.error('Error al eliminar elemento:', error)
    }
  }

  const renameItem = async () => {
    if (!selectedFile || !newItemName) {
      console.error('Faltan campos requeridos')
      return
    }
    try {
      await reqRenameFile({ id: selectedFile.id, newName: newItemName })
      fetchFiles(currentPath)
      setIsRenameModalOpen(false)
      setSelectedFile(null)
      setNewItemName('')
    } catch (error) {
      console.error('Error al renombrar elemento:', error)
    }
  }

  const openFolder = (path: string) => {
    setCurrentPath(path)
    setSearchQuery('')
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const lowercasedQuery = query.toLowerCase()
    const filtered = files.filter(
      (file) =>
        file.name.toLowerCase().includes(lowercasedQuery) ||
        file.path.toLowerCase().includes(lowercasedQuery),
    )
    setFilteredFiles(filtered)
  }

  useEffect(() => {
    fetchFiles(currentPath)
  }, [currentPath])

  const breadcrumbItems = [
    { path: `/patient-${currentPatientId}`, label: 'Inicio' },
    ...currentPath
      .split('/')
      .slice(2)
      .map((segment, index, array) => ({
        path: `/patient-${currentPatientId}/` + array.slice(0, index + 1).join('/'),
        label: segment,
      })),
  ]

  function downloadFile(url, fileName) {
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName
    anchor.style.display = 'none'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  return (
    <>
      <Card shadow='none' className='border rounded-2xl border-[#4444444d]'>
        <CardHeader className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
          <div>
            <Breadcrumbs>
              {breadcrumbItems.map((item, index) => (
                <BreadcrumbItem
                  key={item.path}
                  onClick={() => openFolder(item.path)}
                  className='cursor-pointer'
                >
                  {index === 0 ? <HomeIcon size={16} className='mr-1' /> : null}
                  {item.label}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
          <div className='flex items-center space-x-2 w-full sm:w-auto'>
            <Input
              placeholder='Buscar archivos...'
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              startContent={<SearchIcon size={18} />}
              className='w-full sm:w-64'
            />
            <Dropdown>
              <DropdownTrigger>
                <Button color='primary' endContent={<PlusIcon />} />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  className='default-text-color'
                  startContent={<Upload size={20} />}
                  onPress={() => {
                    setIsCreatingFolder(false)
                    setIsCreateModalOpen(true)
                  }}
                >
                  Subir archivo
                </DropdownItem>
                <DropdownItem
                  startContent={<FolderPlus size={20} />}
                  className='default-text-color'
                  onPress={() => {
                    setIsCreatingFolder(true)
                    setIsCreateModalOpen(true)
                  }}
                >
                  Crear carpeta
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody>
          {filteredFiles.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
              {filteredFiles.map((file) => (
                <Card
                  key={file.id}
                  isPressable={file.isFolder}
                  shadow='none'
                  onPress={() => file.isFolder && openFolder(file.path)}
                  className='border rounded-2xl border-[#4444444d]'
                >
                  <CardBody>
                    <div className='flex items-center p-2 justify-center'>
                      <div className='flex flex-col'>
                        {file.isFolder ? (
                          <FolderIcon className='w-8 h-8 text-blue-500' />
                        ) : (
                          <>
                            {file?.contentType?.startsWith('image/') ? (
                              <img
                                src={file.fileURL || '/placeholder.svg'}
                                alt={file.name}
                                className='w-32 h-32 object-cover rounded'
                              />
                            ) : (
                              <FileIcon className='w-7 h-7 text-gray-500' />
                            )}
                          </>
                        )}
                        <span className='font-medium'>{file.name}</span>
                      </div>
                      {file?.contentType ? (
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly variant='light' className='ml-auto'>
                              <MoreVerticalIcon size={16} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              className='default-text-color'
                              startContent={<Download size={20} />}
                              onPress={() => {
                                downloadFile(file.fileURL, file.name)
                              }}
                            >
                              Descargar
                            </DropdownItem>
                            <DropdownItem
                              className='default-text-color'
                              startContent={<Edit size={20} />}
                              onPress={() => {
                                setSelectedFile(file)
                                setNewItemName(file.name)
                                setIsRenameModalOpen(true)
                              }}
                            >
                              Renombrar
                            </DropdownItem>
                            <DropdownItem
                              startContent={<Trash2 size={20} />}
                              className='text-danger'
                              onPress={() => {
                                setSelectedFile(file)
                                setIsDeleteModalOpen(true)
                              }}
                            >
                              Borrar
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly variant='light' className='ml-auto'>
                              <MoreVerticalIcon size={16} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              startContent={<Edit size={20} />}
                              className='default-text-color'
                              onPress={() => {
                                setSelectedFile(file)
                                setNewItemName(file.name)
                                setIsRenameModalOpen(true)
                              }}
                            >
                              Renombrar
                            </DropdownItem>
                            <DropdownItem
                              className='text-danger'
                              startContent={<Trash2 size={20} />}
                              onPress={() => {
                                setSelectedFile(file)
                                setIsDeleteModalOpen(true)
                              }}
                            >
                              Borrar
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className='flex justify-center items-center'>
              <EmptyTableContent />
            </div>
          )}
        </CardBody>
      </Card>
      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        backdrop='blur'
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='default-text-color'>
            {isCreatingFolder ? 'Crear carpeta' : 'Subir archivo'}
          </ModalHeader>
          <ModalBody>
            <Input
              label='Nombre'
              placeholder='Ingresa el nombre'
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              isRequired
            />
            {!isCreatingFolder && (
              <Input
                type='file'
                onChange={(e) => {
                  const files = e.target.files
                  if (files && files.length > 0) {
                    setUploadFile(files[0])
                  }
                }}
                isRequired
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              variant='light'
              onPress={() => {
                setIsCreateModalOpen(false)
                setSelectedFile(null)
              }}
            >
              Cancelar
            </Button>
            <Button
              color='primary'
              onPress={createItem}
              isDisabled={!newItemName || (!isCreatingFolder && !uploadFile)}
            >
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Rename Modal */}
      <Modal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        backdrop='blur'
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='default-text-color'>Renombrar elemento</ModalHeader>
          <ModalBody>
            <Input
              label='Nuevo nombre'
              placeholder='Ingresa el nuevo nombre'
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={() => setIsRenameModalOpen(false)}>
              Cancelar
            </Button>
            <Button color='primary' onPress={renameItem} isDisabled={!newItemName}>
              Renombrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        backdrop='blur'
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='default-text-color'>Confirmar eliminación</ModalHeader>
          <ModalBody className='default-text-color'>
            <p>¿Estás seguro de que quieres eliminar este elemento?</p>
            <p className='font-bold'>{selectedFile?.name}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='default' variant='light' onPress={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button color='danger' onPress={deleteItem}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
