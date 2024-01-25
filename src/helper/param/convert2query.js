const { Types } = require('mongoose');

function toArray(object) {
  const result = {};

  for (const key in object) {
    const value = object[key];
    if (Array.isArray(value)) {
      result[key] = value;
    } else {
      result[key] = [value];
    }
  }

  return result;
}

function toNumberArray(array) {
  return array.map((string) => Number(string));
}

function sortTimestamps(timestamps) {
  return timestamps.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });
}

const generateQuery = (object, isAdmin, userId) => {
  const arrayQuery = toArray(object);
  const objectQuery = {};
  const arrayQuery2 = [];
  for (const key in arrayQuery) {
    switch (key) {
      case 'difficult':
        objectQuery[`questionContent.difficult`] = {
          $in: toNumberArray(arrayQuery.difficult),
        };
        break;
      case 'type':
        objectQuery[`questionContent.question${key.charAt(0).toUpperCase() + key.slice(1)}`] = {
          $in: toNumberArray(arrayQuery.type),
        };
        break;
      case 'ownerId':
        if (isAdmin) {
          arrayQuery.ownerId.map((string) => {
            return new Types.ObjectId(string);
          });
          objectQuery.ownerId = arrayQuery.ownerId;
          break;
        }
        break;
      case 'topic':
        objectQuery.topics = {
          $in: arrayQuery.topic,
        };
        break;
      case 'subject':
        arrayQuery.subject.map((string) => {
          return new Types.ObjectId(string);
        });
        objectQuery.subject = {
          $in: arrayQuery.subject,
        };
        break;
      case 'grade':
        arrayQuery.grade.map((string) => {
          return new Types.ObjectId(string);
        });
        objectQuery.grade = {
          $in: arrayQuery.grade,
        };
        break;

      case 'day':
        if (arrayQuery.day.length === 1) {
          arrayQuery.day[0] = new Date(arrayQuery.day[0]).toISOString();
          arrayQuery.day.push(new Date().toISOString());
          sortTimestamps(arrayQuery.day);
          objectQuery.createdAt = {
            $gte: arrayQuery.day[0],
            $lte: arrayQuery.day.pop(),
          };
          break;
        }
        const index = [];
        sortTimestamps(arrayQuery.day).map((timestamp) => {
          index.push(new Date(timestamp).toISOString());
        });
        objectQuery.createdAt = {
          $gte: index[0],
          $lte: index.pop(),
        };
        break;
      case 'accessType':
        // if (isAdmin) {
        //   objectQuery.accessType = {
        //     $in: toNumberArray(arrayQuery.accessType),
        //   };
        // }
        if (isAdmin) {
          objectQuery.accessType = 2222;
          objectQuery.shareMember = new Types.ObjectId(userId);
        }
    }
  }

  arrayQuery2.push(objectQuery);
  arrayQuery2.push({
    limit: Number(arrayQuery.limit),
    page: Number(arrayQuery.page),
  });

  return arrayQuery2;
};

module.exports = { generateQuery };
