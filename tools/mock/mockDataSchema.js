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
                    "messages": {
                        "type": "array",
                        "minItems": 3,
                        "maxItems": 50,
                        "items": {
                            "type": "object",
                            "properties": {
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
                            "required": ["timeStamp", "chatMessageType", "userName", "text"]
                        }
                    }
                },
                "required": ["id", "roomName", "description", "messages"]
            }
        }
    },
    "required": ["rooms"]
};
