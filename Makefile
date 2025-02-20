# Define the repository subdirectories
REPOS = labs-code materials wa-weeks

.PHONY: pull

pull:
	@for repo in $(REPOS); do \
		echo "Pulling updates in $$repo..."; \
		(cd $$repo && git pull) || { echo "Failed to pull in $$repo"; exit 1; }; \
	done

