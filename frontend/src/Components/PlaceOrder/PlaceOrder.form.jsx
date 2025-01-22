import React from 'react'
import { PaymentOptionsCompoent } from '../../Middlewares/Form/Input.component'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./PlaceOrder.form.css"

const PlaceOrderForm = ({submitEvent,loading}) => {
    const orderDto = Yup.object({
        paymentType: Yup.object({
          label: Yup.string().matches(/^(Cash on delivery|Pay by E-sewa)$/),
          value: Yup.string()
            .matches(/^(Cash on delivery|Esewa)$/)
            .required(),
        }).required(),
      });

      const {control,handleSubmit,formState: { errors },} = useForm({
        resolver: yupResolver(orderDto),
      });
  return (
    <form onSubmit={handleSubmit(submitEvent)} className='place_order_button--'>
        <PaymentOptionsCompoent
          name='paymentType'
          control={control}
          errMsg={errors?.paymentType?.message}
          required
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input            
            className="submit_btn hoverBotton cart__buy"
            type="submit"
            value="Place order"
            disabled={loading}
            style={{ cursor: "pointer" }}
          />
        </div>
  </form>
  )
}

export default PlaceOrderForm