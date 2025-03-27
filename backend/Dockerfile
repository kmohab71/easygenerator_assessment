###################
# PRODUCTION
###################

FROM node:current-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Expose the port the application will run on
EXPOSE 4000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
