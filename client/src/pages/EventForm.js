import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../utils/mutations';
import { Form, Alert, Button } from 'react-bootstrap';

const EventForm = () => {

    const [eventFormData, setEventFormData] = useState({
        title: '',
        description: '',
        game: [],
        startDate: '',
        endDate: '',
        image: '',
        link: ''
    });

    const [validated] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const [createEvent, { error }] = useMutation(CREATE_EVENT);

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEventFormData({ ...eventFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await createEvent({
                variables: { ...eventFormData },
            });
            console.log(data);
        } catch (err) {
            console.error(err);
        }

        setEventFormData({
            title: '',
            description: '',
            game: [],
            startDate: '',
            endDate: '',
            image: '',
            link: ''
        });
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    Something went wrong with your event creation!
                </Alert>

                <Form.Group>
                    <Form.Label htmlFor="title">Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Event Title"
                        name="title"
                        onChange={handleInputChange}
                        value={eventFormData.title}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Title is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Event Description"
                        name="description"
                        onChange={handleInputChange}
                        value={eventFormData.description}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Description is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="game">Game:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="May input multiple games"
                        name="game"
                        onChange={handleInputChange}
                        value={eventFormData.game}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="startDate">Start Date:</Form.Label>
                    <Form.Control
                        type="date"
                        name="startDate"
                        onChange={handleInputChange}
                        value={eventFormData.startDate}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Start date is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="endDate">End Dated:</Form.Label>
                    <Form.Control
                        type="date"
                        name="endDate"
                        onChange={handleInputChange}
                        value={eventFormData.endDate}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="image">Event Image:</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        value={eventFormData.image}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="link">Link:</Form.Label>
                    <Form.Control
                        type="text"
                        name="link"
                        onChange={handleInputChange}
                        value={eventFormData.link}
                    />
                </Form.Group>
                <Button
                    disabled={
                        !(
                            eventFormData.title &&
                            eventFormData.description &&
                            eventFormData.startDate
                        )
                    }
                    type="submit"
                    variant="success"
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default EventForm;