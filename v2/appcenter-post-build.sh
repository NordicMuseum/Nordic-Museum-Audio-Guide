if [ "$AGENT_JOBSTATUS" == "Succeeded" ]; then
	curl -d content='🎉 Build $APPCENTER_BUILD_ID succeeded!' $BASECAMP_URL
fi