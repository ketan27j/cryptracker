cd /projects/cryptracker

git pull

container_id=`docker ps -a --filter "name=cryptracker" --format "{{.ID}}"`
echo 'containerId:' $container_id
docker stop $container_id

docker container prune -f

image_id=`docker images --format="{{.Repository}} {{.ID}}" | grep "cryptracker" | cut -d " " -f2`
echo 'imageId:' $image_id
docker rmi $image_id

docker image prune -f

docker build -t cryptracker .

docker run --name cryptracker cryptracker


# list all containers
sudo docker ps -a
# stop container
sudo docker stop 893a0fac3f92
# remove container
sudo docker rm 893a0fac3f92
# build image
sudo docker build -t cryptracker .
# spin up container
sudo docker run --name cryptracker cryptracker


# build image using custom docker file for solevents
sudo docker build -t cryptracker-events -f eventDockerfile .

sudo docker run --name cryptracker-events cryptracker-events

# add existing main domaina certificate to new subdomain
sudo certbot --expand -d cryptoconsulting.tech,solindexer.cryptoconsulting.tech,solevents.cryptoconsulting.tech