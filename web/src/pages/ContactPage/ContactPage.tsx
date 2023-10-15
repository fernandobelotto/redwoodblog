import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT = gql`
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message!')
    },
  })

  const formMethods = useForm()

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    formMethods.reset()
  }

  return (
    <div className="p-5">
      <Toaster />
      <MetaTags title="Contact" description="Contact page" />

      <h1 className="text-4xl font-bold">Contact</h1>
      <Form
        onSubmit={onSubmit}
        className="max-w-sm"
        formMethods={formMethods}
        error={error}
      >
        <Label errorClassName="text-red-500" name="name">
          name
        </Label>
        <TextField
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          errorClassName="shadow appearance-none border rounded w-full py-2 px-3 text-red-500 leading-tight focus:outline-none focus:shadow-outline"
          disabled={loading}
          name="name"
          validation={{ required: true }}
        />
        <FieldError name="name" className="text-red-500" />

        <Label errorClassName="text-red-500" name="email">
          email
        </Label>
        <TextField
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          errorClassName="shadow appearance-none border rounded w-full py-2 px-3 text-red-500 leading-tight focus:outline-none focus:shadow-outline"
          disabled={loading}
          name="email"
          validation={{
            required: true,
            // pattern: { value: /[^@]+@[^.]+\..+/, message: 'email not valid!' },
          }}
        />
        <FieldError name="email" className="text-red-500" />
        <Label errorClassName="text-red-500" name="message">
          message
        </Label>
        <TextAreaField
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          errorClassName="shadow appearance-none border rounded w-full py-2 px-3 text-red-500 leading-tight focus:outline-none focus:shadow-outline"
          disabled={loading}
          name="message"
          validation={{ required: true }}
        />
        <FieldError name="message" className="text-red-500" />
        <div className="h-5"></div>
        <Submit
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Loading...' : 'Send message'}
        </Submit>
      </Form>
    </div>
  )
}

export default ContactPage
