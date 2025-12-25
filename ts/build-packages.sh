cd packages;
for D in */;
    do if [ "$D" = "trezoaanchor/" ]; then
        cd $D && yarn && yarn build; cd ..;
    else
        cd $D && yarn init:yarn; cd ..;
    fi
done
