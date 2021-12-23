const LOGGER_MESSAGES = {
  SERVER: {
    ON: 'The server is started on http://{}:{}',
    OFF: 'The server is turned off'
  },
  GET_USER_LIST: {
    REQUEST: '[UserController.getUsers] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[UserController.getUsers] | SUCCESS | Response to the user. data={}',
      ERROR: '[UserController.getUsers] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[UserService.getUsers] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[UserService.getUsers] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
  GET_USER_ID: {
    REQUEST: '[UserController.getUser] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[UserController.getUser] | SUCCESS | Response to the user. data={}',
      ERROR: '[UserController.getUser] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[UserService.getUser] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[UserService.getUser] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
  CREATE_USER: {
    REQUEST: '[UserController.createUser] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[UserController.createUser] | SUCCESS | Response to the user. data={}',
      ERROR: '[UserController.createUser] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[UserService.createUser] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[UserService.createUser] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
  UPDATE_USER: {
    REQUEST: '[UserController.updateUser] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[UserController.updateUser] | SUCCESS | Response to the user. data={}',
      ERROR: '[UserController.updateUser] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[UserService.updateUser] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[UserService.updateUser] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
  GET_POST_ID: {
    REQUEST: '[PostController.getPost] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[PostController.getPost] | SUCCESS | Response to the user. data={}',
      ERROR: '[PostController.getPost] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[PostService.getPost] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[PostService.getPost] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
  GET_POSTS_BY_USER: {
    REQUEST: '[PostController.getPostsByUser] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[PostController.getPostsByUser] | SUCCESS | Response to the user. data={}',
      ERROR: '[PostController.getPostsByUser] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[PostService.getPostsByUser] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[PostService.getPostsByUser] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
  GET_USER_LOGIN: {
    REQUEST: '[UserController.loginUser] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[UserController.loginUser] | SUCCESS | Response to the user. data={}',
      ERROR: '[UserController.loginUser] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[UserService.loginUser] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[UserService.loginUser] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
  GET_POST_LIST: {
    REQUEST: '[PostController.getPosts] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[PostController.getPosts] | SUCCESS | Response to the user. data={}',
      ERROR: '[PostController.getPosts] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[PostService.getPosts] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[PostService.getPosts] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
  GET_COMMENTS_BY_POST: {
    REQUEST: '[CommentController.getCommentByPost] Request from the user. search={}',
    RESPONSE: {
      SUCCESS: '[CommentController.getCommentByPost] | SUCCESS | Response to the user. data={}',
      ERROR: '[CommentController.getCommentByPost] | ERROR | Response to the user. status={} message={}'
    },
    FETCH: {
      SUCCESS: '[CommentService.getCommentByPost] | SUCCESS | Response from DymMyAPI. status={}',
      ERROR: '[CommentService.getCommentByPost] | ERROR | Response from DymMyAPI. status={} message={}'
    }
  },
};

export default LOGGER_MESSAGES;
