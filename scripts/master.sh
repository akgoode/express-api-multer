#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"
# ID="58ba357cf61cbefc4823f8ac"
TOKEN="AgHbZFsIyHTf7saFNUGkczGUrjvSxijoZWJRs+CxlYg=--tfOcLsoiS8gYHSxW0lvslby3/MbEm0ezfsVhhVY95jw="
URL="https://akgoode.s3.amazonaws.com/2017-03-06/2679c6414b30c67dc8b9c67ea8e5a29d.png"
TITLE="2017-03-06/65fbf3882844bdbbee72372cf45f28fd.png"
VERB=POST

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request ${VERB} \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "upload": {
      "url": "'"${URL}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo
