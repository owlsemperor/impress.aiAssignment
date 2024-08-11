import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import './simpleTable.css'

const SimpleTable = ({ dataSource = [], onDelete, onEdit }) => {
  // Show a confirmation dialog and delete the user if confirmed
  const handleDelete = (id) => {
    const confirmed = window.confirm('click ok to delete')
    if (confirmed) {
      onDelete(id)
    }
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className='button-container'>
          <Button
            type='primary' // Blue button for editing
            onClick={() => onEdit(record)}
            className='edit-button'>
            Edit
          </Button>
          <Button
            type='danger' // Red button for deleting
            onClick={() => handleDelete(record.id)}
            className='delete-button'>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className='table-container'>
      {dataSource.length ? (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey='id'
          className='custom-table'
        />
      ) : (
        <p className='no-data'>No user data</p>
      )}
    </div>
  )
}

SimpleTable.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default SimpleTable
