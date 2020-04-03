from rest_framework import permissions
from .models import EnrolledCourses, Course


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.id == request.user.id


class IsTutorUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return request.user.is_tutor == True


class IsSuperUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return request.user.is_superuser == True


class CourseIsLive(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        course = Course.objects.get(id=obj)
        if request.method in permissions.SAFE_METHODS:
            is_live = course.is_live == True
            user_is_owner = course.owner == request.user
            return is_live or user_is_owner

        # Write permissions are only allowed to the owner of the snippet.
        return course.owner == request.user


class OwnsCourse(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
                # check if user has purchased the course before allowing a get request
            user_bought_course = EnrolledCourses.objects.filter(
                course=obj.course, user=request.user).exists()
            user_is_owner = obj.course.owner == request.user
            return user_bought_course or user_is_owner  # returns true if one is true

        return obj.course.owner == request.user
