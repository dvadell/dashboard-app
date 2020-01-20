module.exports.resolvers = {
  Query: {
    getProject: async (parent, args, context, info) => {
      console.log({args, context})
      let project = {};
      let projectsArray =  await context.Projects.find({title: args.title.toLowerCase()}).sort({'version': -1}).limit(1)
      console.log({projectsArray})

      if (projectsArray[0]) {
          // Entry existed in the db
          project = projectsArray[0];
      } else {
          // Maybe there's another one, without lower case?
          projectsArray =  await context.Projects.find({title: args.title}).sort({'version': -1}).limit(1)
          if (projectsArray[0]) {
              // Entry existed in the db
              project = projectsArray[0];
          } else {
              // New entry!
              const newProject = await new context.Projects({title: args.title.toLowerCase()}).save()
              console.log({newProject})
              project = newProject;
          }
      }
      // Ensure we're getting the latest version
      let lastVersion = await project.getCurrentVersion()
      console.log('Versions: this:', project.version, 'latest:', lastVersion[0].version)
      return lastVersion[0]
    },

    getRandomProject: async (parent, args, context, info) => {
      console.log({args, context})
      let count = await context.Projects.estimatedDocumentCount()
      let rand = Math.floor(Math.random() * count);
      let randomProject = await context.Projects.findOne().skip(rand);
      // Ensure we're getting the latest version
      let lastVersion = await randomProject.getCurrentVersion()
      console.log('Versions: this:', randomProject.version, 'latest:', lastVersion[0].version)
      return lastVersion[0]
    },

    searchProject: async (parent, args, context, info) => {
      console.log({args, context})
      // Find entries that matches in title and description
      let results = await context.Projects.find({
        $or: [ 
          {title: new RegExp(args.query, 'i')}, 
          {description: new RegExp(args.query, 'i')}
        ] 
      }, 'title description version')
      .sort({'version': -1}).limit(30)

      // I want to return only the last version.
      let seen = {};
      results.forEach(doc => {
          if (!seen[doc.title.toLowerCase()]) {
              seen[doc.title.toLowerCase()] = doc;
          }

          if (seen[doc.title.toLowerCase()].version < doc.version) {
              seen[doc.title.toLowerCase()] = doc
          }
      })
      let listOfResults = Object.values(seen);
      return listOfResults
    },
  },

  Mutation: {
    saveProject: async (root, args, context) => {
            const newProject = await new context.Projects({
              ...args,
              title: args.title.toLowerCase(),
              version: Math.floor(new Date().getTime() / 1000),
            }).save()
            console.log('Mutation saveProject:', newProject)
            return newProject;
        }
  }
};
