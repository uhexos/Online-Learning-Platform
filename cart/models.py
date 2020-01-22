from django.db import models
from django.utils.translation import ugettext_lazy as _
from courses.models import CustomUser,Course
from django.utils import timezone
class Cart(models.Model):
    creation_date = models.DateTimeField(default=timezone.now,verbose_name=_('creation date'))
    checked_out = models.BooleanField(default=False, verbose_name=_('checked out'))
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    class Meta:
        verbose_name = _('cart')
        verbose_name_plural = _('carts')
        ordering = ('-creation_date',)

    def __str__(self):
        return str(self.creation_date)


class Item(models.Model):
    cart = models.ForeignKey(Cart, verbose_name=_('cart'), on_delete=models.CASCADE,related_name='items')
    quantity = models.PositiveIntegerField(verbose_name=_('quantity'))
    unit_price = models.DecimalField(max_digits=18, decimal_places=2, verbose_name=_('unit price'))
    # product as generic relation
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('item')
        verbose_name_plural = _('items')
        ordering = ('cart',)

    def __str__(self):
        return u'%d units of %s id' % (self.quantity, self.course_id)

    def total_price(self):
        return self.quantity * self.unit_price
    total_price = property(total_price)

    # product
    def get_product(self):
        return Course.objects.get(id=self.course_id)

    # def set_product(self, product):
    #     self.content_type = ContentType.objects.get_for_model(type(product))
    #     self.object_id = product.pk

    # product = property(get_product, set_product)