export const columnsData = {
  columns: [
    { name: 'NOMBRE', uid: 'name' },
    { name: 'APELLIDO', uid: 'lastName' },
    { name: 'ID', uid: 'id' },
    { name: 'CEDULA', uid: 'CI' },
    { name: 'GÉNERO', uid: 'gender' },
    { name: 'EDAD', uid: 'age', sortable: true },
    { name: 'EMAIL', uid: 'email' },
    { name: 'STATUS', uid: 'status', sortable: true },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Vivo', uid: 'ALIVE' },
    { name: 'Fallecido', uid: 'DEAD' },
    { name: 'Masculino', uid: 'MALE' },
    { name: 'Femenino', uid: 'FEMALE' },
  ],
  InitialVisibleColumns: ['CI', 'age', 'role', 'name', 'gender', 'status', 'actions', 'lastName'],
}

export const modalInputs = {
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre',
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Apellido',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
    },
    {
      type: 'number',
      name: 'CI',
      label: 'Cédula',
    },
    {
      type: 'number',
      name: 'age',
      label: 'Edad',
    },
    {
      type: 'text',
      name: 'avatar',
      label: 'Avatar',
    },
  ],
  selectInputs: [
    {
      name: 'status',
      label: 'Estado del paciente',
      options: [
        { label: 'Vivo', value: 'ALIVE' },
        { label: 'Fallecido', value: 'DEAD' },
      ],
    },
    {
      name: 'gender',
      label: 'Género',
      options: [
        { label: 'Masculino', value: 'MALE' },
        { label: 'Femenino', value: 'FEMALE' },
      ],
    },
  ],
}
