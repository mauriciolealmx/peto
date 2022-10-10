import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

import LoaderButton from '../../components/LoaderButton';
import config from '../../config/aws-amplify.config';
import s3Updload from '../../utils/s3Upload';

import './NewPost.css';

const NewPost = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (file?.size > config.MAX_ATTACHMENT_SIZE) {
      const maxMegabytes = config.MAX_ATTACHMENT_SIZE / 1_000_000;
      alert(`Please pick a file smaller than ${maxMegabytes} MB.`);

      return;
    }

    setIsLoading(true);

    try {
      const imageURL = file ? await s3Updload(file) : null;

      await API.post('posts', '/posts', {
        body: { imageURL },
      });

      navigate('/');
    } catch (e) {
      console.log({ e });
    }

    setIsLoading(false);
  }

  return (
    <div className="NewPost">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="file">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!file?.size}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
};

export default NewPost;
