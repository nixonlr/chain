import { chainClient } from 'utility/environment'
import { push } from 'react-router-redux'

export default function(type, options = {}) {
  const updated = (param) => ({ type: `UPDATED_${type.toUpperCase()}`, param })

  return {
    updated,
    submitUpdateForm: (data, id) => {
      const clientApi = options.clientApi ? options.clientApi() : chainClient()[`${type}s`]

      return async function(dispatch) {
        const resp = await clientApi.updateTags({
          id: id,
          tags: JSON.parse(data.tags),
        })

        dispatch(updated(resp))
        dispatch(push({
          pathname: `/${type}s/${id}`,
          state: {
            preserveFlash: true
          }
        }))
      }
    }
  }
}
