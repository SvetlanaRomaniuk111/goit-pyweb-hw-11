const url = 'http://localhost:8000/api/contacts/'

window.getContacts = async function (skip = 0, limit = 100) {
  const response = await fetch(`${url}?skip=${skip}&limit=${limit}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const contacts = await response.json()
  return contacts
}

window.createContact = async function (contact) {
  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail[0].msg);
    }
  } catch (error) {
    throw error;
  }
}

window.editContact = async function (contact) {
  try {
    const response = await fetch(`${url}${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail[0].msg);
    }
  } catch (error) {
    throw error;
  }
}

window.deleteContact = async function (id) {
  const response = await fetch(`${url}${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}
