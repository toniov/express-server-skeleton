Running server:

```sh
git clone --single-branch -b wip https://github.com/toniov/express-server-skeleton.git
cd express-server-skeleton
docker-compose build
docker-compose up
```

From a different terminal:
```sh
curl -v localhost:3000/api/users
```

Pending tasks:
- Check when Redis is not running
- Add linting
- Error Handling
  - Custom Errors?
- Logging
  - Choose library
- Add config module
  - nconf or node-config?
- Validate and sanitize requests
- Tests
  - Add fixture loading
  - Add support for CircleCI
