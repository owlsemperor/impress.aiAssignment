import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputHandler from './commonInput'
import SimpleTable from './simpleTable'
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  setEditedUser,
  clearEditedUser,
} from '../actions/userActions'
import { Modal, Input, Form, Button } from 'antd'

const MainComponent = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.userState.users)
  const editedUser = useSelector((state) => state.editedUserState.editedUser)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(getUsers()) // Fetch users when the component mounts
  }, [dispatch])

  useEffect(() => {
    if (editedUser) {
      form.setFieldsValue({ name: editedUser.name, email: editedUser.email })
      setIsModalVisible(true)
    }
  }, [editedUser, form])

  const handleSubmit = ({ name, email }) => {
    if (editedUser) {
      dispatch(updateUser({ ...editedUser, name, email }))
      dispatch(clearEditedUser()) // Clear edited user after updating
    } else {
      dispatch(addUser({ name, email }))
    }
    setIsModalVisible(false)
  }

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }

  const handleEdit = (user) => {
    dispatch(setEditedUser(user)) // Set the user to be edited
  }

  const handleCancel = () => {
    dispatch(clearEditedUser()) // Clear edited user on cancel
    setIsModalVisible(false)
  }

  return (
    <div id='main-container-wrapper'>
      <InputHandler onSubmit={handleSubmit} editMode={!!editedUser} />
      <SimpleTable
        dataSource={userState}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <Modal
        title='Edit User'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}>
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MainComponent
