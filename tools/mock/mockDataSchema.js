export const schema = {
    "type": "object",
    "properties": {
        "rooms": {
            "type": "array",
            "minItems": 3,
            "maxItems": 5,
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "minimum": 1,
                        "unique": true
                    },
                    "roomName": {
                        "type": "string",
                        "faker": "commerce.productName"
                    },
                    "description": {
                        "type": "string",
                        "faker": "company.catchPhrase"
                    },
                    "phoneInfo": {
                        "type": "string",
                        "faker": "phone.phoneNumber"
                    },
                    "chatMessages": {
                        "type": "array",
                        "minItems": 3,
                        "maxItems": 50,
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "minimum": 1,
                                    "unique": true
                                },
                                "timeStamp": {
                                    "type": "string",
                                    "faker": "date.recent"
                                },
                                "chatMessageType": {
                                    "type": "string",
                                    "chance": {"pickone": [["Chat", "Action"]]}
                                },
                                "userName": {
                                    "type": "string",
                                    "faker": "name.findName"
                                },
                                "text": {
                                    "type": "string",
                                    "minLength": 1,
                                    "maxLength": 200,
                                    "faker": "hacker.phrase"
                                }
                            },
                            "required": ["id", "timeStamp", "chatMessageType", "userName", "text"]
                        }
                    },
                    "checklistItems": {
                        "type": "array",
                        "minItems": 1,
                        "maxItems": 5,
                        "items": {
                            "type": "object",
                            "properties": {
                                "scheduledStartTime": {
                                    "type": "string",
                                    "faker": "date.recent"
                                },
                                "scheduledEndTime": {
                                    "type": "string",
                                    "faker": "date.recent"
                                },
                                "actualStartTime": {
                                    "type": "string",
                                    "faker": "date.recent"
                                },
                                "actualEndTime": {
                                    "type": "string",
                                    "faker": "date.recent"
                                },
                                "status": {
                                    "type": "string",
                                    "chance": {"pickone": [["NotStarted", "InProgress", "InProgressWithIssues", "CompletedSuccessfully", "CompletedWithIssues", "CompletedWithErrors", "Canceled"]]}
                                },
                                "description": {
                                    "type": "string",
                                    "minLength": 15,
                                    "maxLength": 50,
                                    "faker": "company.catchPhrase"
                                },
                                "userName": {
                                    "type": "string",
                                    "faker": "name.findName"
                                },
                                "chatMessages": {
                                    "type": "array",
                                    "minItems": 0,
                                    "maxItems": 2,
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "integer",
                                                "minimum": 1,
                                                "unique": true
                                            },
                                            "timeStamp": {
                                                "type": "string",
                                                "faker": "date.recent"
                                            },
                                            "chatMessageType": {
                                                "type": "string",
                                                "chance": {"pickone": [["Chat"]]}
                                            },
                                            "userName": {
                                                "type": "string",
                                                "faker": "name.findName"
                                            },
                                            "text": {
                                                "type": "string",
                                                "minLength": 1,
                                                "maxLength": 200,
                                                "faker": "hacker.phrase"
                                            }
                                        },
                                        "required": ["id", "timeStamp", "chatMessageType", "userName", "text"]
                                    }
                                }
                            },
                            "required": ["scheduledStartTime", "scheduledEndTime", "status", "description", "chatMessages"]
                        }
                    }
                },
                "required": ["id", "roomName", "description", "chatMessages", "checklistItems"]
            }
        }
    },
    "required": ["rooms"]
};
