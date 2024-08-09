import React from 'react'

const SimpleTable = ({ dataSource }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {dataSource.length ? (
        <div>
          {dataSource.map((item, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div>Id: {item.id}</div>
              <div>Name: {item.name}</div>
              <div>Email: {item.email}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No user data</p>
      )}
    </div>
  )
}

export default SimpleTable
