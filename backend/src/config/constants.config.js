const FileFilterType = {
    IMAGE : 'image',
    VIDEO : 'video',
    DOCUMENT : 'doc',
    AUDIO : 'audio'

}
const UserRoles ={
    ADMIN:"admin",
    SELLER:"seller",
    CUSTOMER:"customer",
}

const Status={
    ACTIVE:"active",
    INACTIVE:"inactive"
}
const BannerCategory={
    IMAGE:"image",
    VIDEO:"video"
}

const Wearable={
    SUMMER:'summer',
    WINTER:'winter',
    BOTH:'summer and winter'
}
module.exports ={
    FileFilterType,
    UserRoles,
    Status,
    BannerCategory,
    Wearable
}